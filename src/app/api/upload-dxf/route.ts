import { NextResponse } from "next/server";
import { Helper } from "dxf";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Dosya yüklenmedi" }, { status: 400 });
    }

    // DXF Dosyasını oku
    const text = await file.text();
    const helper = new Helper(text);
    
    // **DXF Verilerini Parse Et**
    const dxfData = helper.parse();

    if (!dxfData || !dxfData.entities || dxfData.entities.length === 0) {
      return NextResponse.json({ error: "Geçerli DXF verisi bulunamadı" }, { status: 400 });
    }

   // console.log("DXF içinde bulunan entity türleri:", dxfData.entities.map((e: any) => e.type));
   // console.log("DXF içindeki bloklar:", Object.keys(dxfData.blocks || {}));

    // **Blok içeriğini listeleyelim ve en dolu bloğu bulalım**
    let largestBlock = { name: "", entityCount: 0 };

    Object.entries(dxfData.blocks || {}).forEach(([blockName, blockData]: any) => {
      const entityCount = blockData.entities?.length || 0;
    //  console.log(`Blok: ${blockName}, İçindeki çizim sayısı: ${entityCount}`);
      if (entityCount > largestBlock.entityCount) {
        largestBlock = { name: blockName, entityCount };
      }
    });

    // **Min & Max X/Y Koordinatlarını Bul**
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let contourLength = 0;
    

 // 🔹 Kontur uzunluğunu hesaplamak için değişken

    const processEntity = (entity: any) => {
      if (entity.type === "LINE") {
        if (!entity.start || !entity.end) return;
    
        // 🔹 Çizgi uzunluğu hesapla ve ekle
        const length = Math.sqrt(
          Math.pow(entity.end.x - entity.start.x, 2) + Math.pow(entity.end.y - entity.start.y, 2)
        );
        contourLength += length;
    
        // 🔹 Mevcut min-max hesaplamalarını değiştirmeden bırak
        minX = Math.min(minX, entity.start.x, entity.end.x);
        maxX = Math.max(maxX, entity.start.x, entity.end.x);
        minY = Math.min(minY, entity.start.y, entity.end.y);
        maxY = Math.max(maxY, entity.start.y, entity.end.y);
      } 
      else if (entity.type === "CIRCLE") {
        if (!entity.x || !entity.y || !entity.r) return;
    
        // 🔹 Çember çevresini hesapla ve ekle
        const circumference = 2 * Math.PI * entity.r;
        contourLength += circumference;
    
        minX = Math.min(minX, entity.x - entity.r);
        maxX = Math.max(maxX, entity.x + entity.r);
        minY = Math.min(minY, entity.y - entity.r);
        maxY = Math.max(maxY, entity.y + entity.r);
      } 
      else if (entity.type === "ARC") {
        if (!entity.startAngle || !entity.endAngle || !entity.r) return;
    
        // 🔹 Yay uzunluğunu hesapla ve ekle
        const angle = Math.abs(entity.endAngle - entity.startAngle);
        const arcLength = (Math.PI * entity.r * angle) / 180;
        contourLength += arcLength;
      } 
      else if (entity.type === "POLYLINE" || entity.type === "LWPOLYLINE") {
        if (!entity.vertices || entity.vertices.length < 2) return;
    
        // 🔹 Polyline uzunluğunu hesapla ve ekle
        for (let i = 0; i < entity.vertices.length - 1; i++) {
          const v1 = entity.vertices[i];
          const v2 = entity.vertices[i + 1];
          const segmentLength = Math.sqrt(
            Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2)
          );
          contourLength += segmentLength;
        }
    
        // 🔹 Kapalı polyline ise başlangıç ve bitiş noktalarını bağla
        if (entity.closed) {
          const first = entity.vertices[0];
          const last = entity.vertices[entity.vertices.length - 1];
          const closingSegmentLength = Math.sqrt(
            Math.pow(last.x - first.x, 2) + Math.pow(last.y - first.y, 2)
          );
          contourLength += closingSegmentLength;
        }
    
        // 🔹 Mevcut min-max hesaplamaları
        entity.vertices.forEach((v: any) => {
          minX = Math.min(minX, v.x);
          maxX = Math.max(maxX, v.x);
          minY = Math.min(minY, v.y);
          maxY = Math.max(maxY, v.y);
        });
      } 
      else if (entity.type === "SPLINE") {
        if (!entity.controlPoints || entity.controlPoints.length < 2) return;
    
        // 🔹 Eğri uzunluğunu hesapla ve ekle
        for (let i = 0; i < entity.controlPoints.length - 1; i++) {
          const p1 = entity.controlPoints[i];
          const p2 = entity.controlPoints[i + 1];
          const segmentLength = Math.sqrt(
            Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
          );
          contourLength += segmentLength;
        }
    
        // 🔹 Mevcut min-max hesaplamaları
        entity.controlPoints.forEach((point: any) => {
          minX = Math.min(minX, point.x);
          maxX = Math.max(maxX, point.x);
          minY = Math.min(minY, point.y);
          maxY = Math.max(maxY, point.y);
        });
      } 
      else if (entity.type === "INSERT") {
        let blockName = entity.block.replace(/\D/g, ""); // Sadece sayıyı al
        let block = dxfData.blocks?.[blockName];
    
        if (!block || block.entities?.length === 0) {
          if (largestBlock.entityCount > 0) {
            blockName = largestBlock.name;
            block = dxfData.blocks?.[blockName];
          }
        }
    
        if (block && block.entities && block.entities.length > 0) {
          block.entities.forEach(processEntity);
        }
      }
    };
    
    // **Tüm varlıkları işle**
    dxfData.entities.forEach(processEntity);

    // Eğer minX veya minY hala Infinity ise DXF içinde ölçü alınacak bir obje yok demektir.
    if (minX === Infinity || minY === Infinity || maxX === -Infinity || maxY === -Infinity) {
      return NextResponse.json({
        error: "DXF içinde ölçü alınacak nesne bulunamadı.",
        entityTypes: dxfData.entities.map((e: any) => e.type),
        blocks: Object.keys(dxfData.blocks || {}),
        blockContents: Object.entries(dxfData.blocks || {}).map(([name, data]: any) => ({
          name,
          entityCount: data.entities?.length || 0
        }))
      }, { status: 400 });
    }







    // **Ölçümleri Hesapla**
    const width = maxX - minX;
    const height = maxY - minY;
    const aspectRatio = width / height;

    // **SVG çıktısını oluştur**
    const svg = helper.toSVG();

    return NextResponse.json({
      svg,
      width: width.toFixed(2),
      height: height.toFixed(2),
      aspectRatio: aspectRatio.toFixed(2),
      contourLength: contourLength.toFixed(2)
    });
  

  }  catch (error) {
    console.error("DXF İşleme Hatası:", error);
    
    return NextResponse.json(
      { 
        error: "DXF işleme hatası", 
        // Cast `error` to `Error` before using `.message`
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}
