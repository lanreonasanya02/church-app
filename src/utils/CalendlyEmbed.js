import { useEffect } from "react";

export default function CalendlyEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/amazinggraceheirs/30min?hide_event_type_details=1"
      style={{ minWidth: "320px", height: "500px" }}
    ></div>
  );
}
