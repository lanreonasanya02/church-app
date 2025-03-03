"use client";
import { useEffect } from "react";
import { db } from "@/db/firebase";
import { onSnapshot, collection } from "firebase/firestore";

export default function SermonProvider() {
  useEffect(() => {
    const sermonRef = collection(db, "sermons");

    const unsubscribe = onSnapshot(sermonRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          sendMessageToWhatsApp(data);
        }
      });
    });

    return () => unsubscribe(); //
  }, []);

  const sendMessageToWhatsApp = (data: any) => {
    const message = `https://amazing-grace-heirs.mixlr.com/recordings/${data.id}

Weekly service - ${data.date}

${data.program}
Minister: ${data.preacher}
Topic: ${data.title}
Study text: ${data.studyText}

Sermon:
${data.message}

Prayers:
${data.prayers
  .split(";")
  .map((p: string) => `- ${p.trim()}`)
  .join("\n")}

You can also access all Amazing Grace sermons, please use the link below 

https://amazing-grace-heirs.mixlr.com/recordings

Shalom.`;

    const encodedMessage = encodeURIComponent(message);
    const groupInviteLink = `https://chat.whatsapp.com/G0agiTfkklzJmNZ6eAbSvb`;

    window.open(`${groupInviteLink}?text=${encodedMessage}`, "_blank");
    navigator.clipboard.writeText(message).then(() => {
      alert("Message copied! Paste it in the WhatsApp group.");
    });
  };

  return null;
}
