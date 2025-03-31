import React from "react";

export default function TextFormatter({ text }) {
  const parseText = (rawText) => {
    const lines = rawText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const output = [];
    let currentList = [];

    const isListItem = (line) => /^(\d+\.\s+|[-•]\s+)/.test(line);

    lines.forEach((line) => {
      if (isListItem(line)) {
        currentList.push(line);
      } else {
        if (currentList.length) {
          output.push({ type: "list", content: [...currentList] });
          currentList = [];
        }
        output.push({ type: "text", content: line });
      }
    });

    if (currentList.length) {
      output.push({ type: "list", content: [...currentList] });
    }

    return output;
  };

  const formattedBlocks = parseText(text);

  return (
    <div className="text-base md:text-lg leading-relaxed text-justify">
      {formattedBlocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <p key={index} className="mb-5">
              {block.content}
            </p>
          );
        } else if (block.type === "list") {
          const isOrdered = /^\d+\./.test(block.content[0]);
          const ListTag = isOrdered ? "ol" : "ul";
          return (
            <ListTag key={index} className="list-inside list-disc mb-0 pl-4">
              {block.content.map((item, i) => (
                <li key={i}>{item.replace(/^(\d+\.\s+|[-•]\s+)/, "")}</li>
              ))}
            </ListTag>
          );
        }
      })}
    </div>
  );
}
