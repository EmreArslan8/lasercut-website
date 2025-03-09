const styles = {
  sliderContainer: {
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: { xs: "0 15px 0px 10px", md: "0 60px" }
  },
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: { xs: "10px", md: "35px" },
    transform: 'translateY(-50%)',
    zIndex: 2,
    width: 20,
    height: 50,
    minWidth: 20,
    minHeight: 50,
    bgcolor: 'primary.main', // ✅ Burada rengi değiştiriyoruz
    color: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 0,
    ":hover": {
      bgcolor: 'primary.dark', // Hover rengi
    },
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: { xs: "10px", md: "35px" },
    transform: 'translateY(-50%)',
    zIndex: 2,
    width: 20,
    height: 50,
    minWidth: 20,
    minHeight: 50,
    bgcolor: 'primary.main', // ✅ Burada rengi değiştiriyoruz
    color: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 0,
    ":hover": {
      bgcolor: 'primary.dark', // Hover rengi
    },
  },
  
};
export default styles;
