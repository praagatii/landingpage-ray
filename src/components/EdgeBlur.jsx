export function EdgeBlur({ position = "bottom", height = 75 }) {
  const blurLayers = [1, 2, 3, 6, 12];
  const isTop = position === "top";

  return (
    <div
      className={`edge-blur ${isTop ? "edge-blur-top" : "edge-blur-bottom"}`}
      style={{ height }}
    >
      {blurLayers.map((blur) => (
        <div
          key={blur}
          className="edge-blur-layer"
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            maskImage: `linear-gradient(to ${isTop ? "bottom" : "top"}, black, transparent)`,
            WebkitMaskImage: `linear-gradient(to ${isTop ? "bottom" : "top"}, black, transparent)`,
          }}
        />
      ))}
    </div>
  );
}

export function TopBlur({ height = 75 }) {
  return <EdgeBlur position="top" height={height} />;
}

export function BottomBlur({ height = 75 }) {
  return <EdgeBlur position="bottom" height={height} />;
}
