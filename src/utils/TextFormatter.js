import React from "react";

export default function TextFormatter({ text, maxSentences = 5 }) {
  const splitIntoParagraphs = (text) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || []; // Split text into sentences
    let paragraphs = [];
    let tempParagraph = [];

    sentences.forEach((sentence) => {
      tempParagraph.push(sentence.trim());

      if (tempParagraph.length >= maxSentences) {
        paragraphs.push(tempParagraph.join(" "));
        tempParagraph = [];
      }
    });

    if (tempParagraph.length) {
      paragraphs.push(tempParagraph.join(" "));
    }

    return paragraphs;
  };

  const formattedParagraphs = splitIntoParagraphs(text);

  return (
    <div className="text-lg leading-relaxed text-justify">
      {formattedParagraphs.map((paragraph, index) => (
        <div key={index} className="mb-8">
          {paragraph}
        </div>
      ))}
    </div>
  );
}
