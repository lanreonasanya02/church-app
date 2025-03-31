import React from "react";

export default function TextFormatter({ text, maxSentences = 5 }) {
  const splitIntoParagraphs = (text) => {
    const lines = text.split(/\n+/); // Split by new lines
    const paragraphs = [];
    let tempSentences = [];

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Check for bullet list
      if (/^[-*•]\s+/.test(trimmed)) {
        if (tempSentences.length) {
          paragraphs.push({ type: "text", content: tempSentences.join(" ") });
          tempSentences = [];
        }
        paragraphs.push({
          type: "ul",
          content: trimmed.replace(/^[-*•]\s+/, ""),
        });
      }
      // Check for numbered list
      else if (/^\d+\.\s+/.test(trimmed)) {
        if (tempSentences.length) {
          paragraphs.push({ type: "text", content: tempSentences.join(" ") });
          tempSentences = [];
        }
        paragraphs.push({
          type: "ol",
          content: trimmed.replace(/^\d+\.\s+/, ""),
        });
      }
      // Regular sentence block
      else {
        const sentences = trimmed.match(/[^.!?]+[.!?]+/g) || [trimmed];
        sentences.forEach((sentence) => {
          tempSentences.push(sentence.trim());
          if (tempSentences.length >= maxSentences) {
            paragraphs.push({ type: "text", content: tempSentences.join(" ") });
            tempSentences = [];
          }
        });
      }
    });

    if (tempSentences.length) {
      paragraphs.push({ type: "text", content: tempSentences.join(" ") });
    }

    return paragraphs;
  };

  const grouped = splitIntoParagraphs(text);

  // Merge consecutive list items
  const mergedParagraphs = [];
  let currentList = null;

  grouped.forEach((item) => {
    if (item.type === "ul" || item.type === "ol") {
      if (!currentList || currentList.type !== item.type) {
        if (currentList) mergedParagraphs.push(currentList);
        currentList = { type: item.type, content: [item.content] };
      } else {
        currentList.content.push(item.content);
      }
    } else {
      if (currentList) {
        mergedParagraphs.push(currentList);
        currentList = null;
      }
      mergedParagraphs.push(item);
    }
  });

  if (currentList) mergedParagraphs.push(currentList);

  return (
    <div className="text-base md:text-lg leading-relaxed text-justify">
      {mergedParagraphs.map((item, index) => {
        if (item.type === "text") {
          return (
            <div key={index} className="mb-2">
              {item.content}
            </div>
          );
        }

        if (item.type === "ul") {
          return (
            <ul key={index} className="list-disc list-inside mb-6 pl-10">
              {item.content.map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
          );
        }

        if (item.type === "ol") {
          return (
            <ol key={index} className="list-decimal list-inside mb-6 pl-10">
              {item.content.map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ol>
          );
        }

        return null;
      })}
    </div>
  );
}

// import React from "react";

// export default function TextFormatter({ text, maxSentences = 5 }) {
//   const splitIntoParagraphs = (text) => {
//     const sentences = text.match(/[^.!?]+[.!?]+/g) || []; // Split text into sentences
//     let paragraphs = [];
//     let tempParagraph = [];

//     sentences.forEach((sentence) => {
//       tempParagraph.push(sentence.trim());

//       if (tempParagraph.length >= maxSentences) {
//         paragraphs.push(tempParagraph.join(" "));
//         tempParagraph = [];
//       }
//     });

//     if (tempParagraph.length) {
//       paragraphs.push(tempParagraph.join(" "));
//     }

//     return paragraphs;
//   };

//   const formattedParagraphs = splitIntoParagraphs(text);

//   return (
//     <div className="text-base md:text-lg leading-relaxed text-justify">
//       {formattedParagraphs.map((paragraph, index) => (
//         <div key={index} className="mb-8">
//           {paragraph}
//         </div>
//       ))}
//     </div>
//   );
// }
