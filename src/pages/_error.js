/**
 * Pages Router fallback: Sunucu hata verdiğinde Next.js bu sayfayı arar.
 * App Router error.tsx ile birlikte bu dosya "missing required error components" mesajını önler.
 */
function Error({ statusCode }) {
  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
        {statusCode ? `Hata ${statusCode}` : "Bir şeyler yanlış gitti"}
      </h1>
      <p style={{ color: "#666", fontSize: "0.875rem" }}>
        Sayfayı yenilemeyi deneyin veya ana sayfaya dönün.
      </p>
      <a href="/" style={{ display: "inline-block", marginTop: "1rem", color: "#1e3a5f" }}>
        Ana sayfaya dön
      </a>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
