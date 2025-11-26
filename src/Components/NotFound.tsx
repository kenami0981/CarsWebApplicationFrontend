import notFoundIcon from "../Media/not-found.png"
export default function NotFound() {
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            textAlign: "center",
            color: "#e0e0e0"
        }}>
            <h1 style={{ fontSize: "28px" }}>The page you're looking for doesn't exist.</h1>
            <img 
                src={notFoundIcon} 
                alt="Not found icon"
                style={{ width: "600px", opacity: 0.9 }}
            />

            
        </div>
    );
}
