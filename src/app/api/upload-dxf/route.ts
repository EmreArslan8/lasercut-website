import { NextResponse } from "next/server";
import { Helper } from "dxf";
import type { NextRequest } from "next/server";

/** 📌 DXF İçin Türler */
interface DXFEntity {
  type: string;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  x?: number;
  y?: number;
  r?: number;
  vertices?: { x: number; y: number }[];
  closed?: boolean;
  controlPoints?: { x: number; y: number }[];
}

interface DXFBlock {
  entities?: DXFEntity[];
}

/** 📌 DXF Dosya İşleme API */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Dosya yüklenmedi" }, { status: 400 });
    }

    // 📌 DXF Dosyasını Oku ve Parse Et
    const text = await file.text();
    const helper = new Helper(text);
    const dxfData = helper.parse();

    if (!dxfData || !dxfData.entities || dxfData.entities.length === 0) {
      return NextResponse.json({ error: "Geçerli DXF verisi bulunamadı" }, { status: 400 });
    }

    // 📌 DXF İçindeki Blokları Analiz Et
    let largestBlock = { name: "", entityCount: 0 };

    Object.entries(dxfData.blocks ?? {}).forEach(([blockName, blockData]) => {
      const block = blockData as DXFBlock; // **📌 Türü açıkça belirtiyoruz**
      const entityCount = block.entities?.length || 0;
      if (entityCount > largestBlock.entityCount) {
        largestBlock = { name: blockName, entityCount };
      }
    });

    // 📌 Min & Max X/Y Koordinatlarını Bul
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let contourLength = 0;

    // 📌 DXF İçerisindeki Varlıkları İşleyen Fonksiyon
    const processEntity = (entity: DXFEntity) => {
      if (entity.type === "LINE" && entity.start && entity.end) {
        const length = Math.sqrt(
          Math.pow(entity.end.x - entity.start.x, 2) + Math.pow(entity.end.y - entity.start.y, 2)
        );
        contourLength += length;
        minX = Math.min(minX, entity.start.x, entity.end.x);
        maxX = Math.max(maxX, entity.start.x, entity.end.x);
        minY = Math.min(minY, entity.start.y, entity.end.y);
        maxY = Math.max(maxY, entity.start.y, entity.end.y);
      }

      if (entity.type === "CIRCLE" && entity.x !== undefined && entity.y !== undefined && entity.r !== undefined) {
        const circumference = 2 * Math.PI * entity.r;
        contourLength += circumference;
        minX = Math.min(minX, entity.x - entity.r);
        maxX = Math.max(maxX, entity.x + entity.r);
        minY = Math.min(minY, entity.y - entity.r);
        maxY = Math.max(maxY, entity.y + entity.r);
      }

      if (entity.type === "POLYLINE" || entity.type === "LWPOLYLINE") {
        if (!entity.vertices || entity.vertices.length < 2) return;
        for (let i = 0; i < entity.vertices.length - 1; i++) {
          const v1 = entity.vertices[i];
          const v2 = entity.vertices[i + 1];
          const segmentLength = Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2));
          contourLength += segmentLength;
        }
        if (entity.closed) {
          const first = entity.vertices[0];
          const last = entity.vertices[entity.vertices.length - 1];
          const closingSegmentLength = Math.sqrt(
            Math.pow(last.x - first.x, 2) + Math.pow(last.y - first.y, 2)
          );
          contourLength += closingSegmentLength;
        }
        entity.vertices.forEach((v) => {
          minX = Math.min(minX, v.x);
          maxX = Math.max(maxX, v.x);
          minY = Math.min(minY, v.y);
          maxY = Math.max(maxY, v.y);
        });
      }

      if (entity.type === "SPLINE" && entity.controlPoints) {
        for (let i = 0; i < entity.controlPoints.length - 1; i++) {
          const p1 = entity.controlPoints[i];
          const p2 = entity.controlPoints[i + 1];
          const segmentLength = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
          contourLength += segmentLength;
        }
        entity.controlPoints.forEach((point) => {
          minX = Math.min(minX, point.x);
          maxX = Math.max(maxX, point.x);
          minY = Math.min(minY, point.y);
          maxY = Math.max(maxY, point.y);
        });
      }
    };

    // 📌 Tüm Varlıkları İşle
    dxfData.entities.forEach((entity) => processEntity(entity as DXFEntity));

    // 📌 Ölçümleri Hesapla
    const width = maxX - minX;
    const height = maxY - minY;
    const aspectRatio = width / height;

    // 📌 SVG Çıktısını Oluştur
    let svg = helper.toSVG();
    svg = svg
      .replace(/<svg /, '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" ')
      .replace(/<path /g, '<path stroke="black" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round" ')
      .replace(/<polygon /g, '<polygon stroke="black" stroke-width="1" fill="lightgray" ')
      .replace(/<rect /g, '<rect stroke="black" stroke-width="1" fill="lightgray" ')
      .replace(/<circle /g, '<circle stroke="black" stroke-width="1" fill="none" ') 
      .replace(/<ellipse /g, '<ellipse stroke="black" stroke-width="1" fill="none" ');

    return NextResponse.json({
      svg,
      width: width.toFixed(2),
      height: height.toFixed(2),
      aspectRatio: aspectRatio.toFixed(2),
      contourLength: contourLength.toFixed(2),
    });

  } catch (error) {
    console.error("DXF İşleme Hatası:", error);
    return NextResponse.json({ error: "DXF işleme hatası", details: (error as Error).message }, { status: 500 });
  }
}
