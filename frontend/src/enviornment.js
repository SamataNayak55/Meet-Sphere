let IS_PROD = true;
const servers = IS_PROD ?
    "https://meet-sphere-backend.vercel.app" :
    "http://localhost:8000"

export default servers;