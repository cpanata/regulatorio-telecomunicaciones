(() => {
  const getValue = (source, path) => path.split(".").reduce((value, key) => value?.[key], source);

  const applyContent = (content) => {
    document.querySelectorAll("[data-content]").forEach((element) => {
      const value = getValue(content, element.dataset.content);
      if (typeof value === "string") {
        element.textContent = value;
      }
    });

    const siteName = getValue(content, "brand.name");
    const description = getValue(content, "hero.description");
    if (typeof siteName === "string") {
      document.title = `${siteName} | Servicios regulatorios`;
      document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    }
    if (typeof description === "string") {
      document.querySelector('meta[name="description"]')?.setAttribute("content", description);
      document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    }

    const number = getValue(content, "contact.whatsappNumber");
    const phoneLink = document.querySelector("[data-phone-link]");
    const whatsappHelp = document.getElementById("whatsapp-help");
    if (typeof number !== "string" || !/^[1-9]\d{7,14}$/.test(number)) {
      console.error("El número de WhatsApp del contenido debe tener entre 8 y 15 dígitos en formato internacional.");
      document.querySelectorAll(".whatsapp-link").forEach((link) => {
        link.removeAttribute("href");
        link.setAttribute("aria-disabled", "true");
      });
      phoneLink?.removeAttribute("href");
      if (whatsappHelp) {
        whatsappHelp.textContent = "Número de WhatsApp inválido. Actualízalo desde el panel de administración.";
      }
      return;
    }

    phoneLink?.setAttribute("href", `tel:+${number}`);
    document.querySelectorAll(".whatsapp-link").forEach((link) => {
      const messageKey = link.dataset.messageContent;
      const message = messageKey ? getValue(content, messageKey) : undefined;
      const fallbackMessage = link.dataset.message;
      const finalMessage = typeof message === "string" && message.trim() ? message : fallbackMessage;
      if (typeof finalMessage !== "string" || !finalMessage.trim()) {
        console.error(`Falta un mensaje válido de WhatsApp para ${messageKey || "un enlace"}.`);
        link.removeAttribute("href");
        link.setAttribute("aria-disabled", "true");
        return;
      }
      link.href = `https://wa.me/${number}?text=${encodeURIComponent(finalMessage)}`;
      link.removeAttribute("aria-disabled");
    });
  };

  document.getElementById("year").textContent = new Date().getFullYear();
  if (window.location.protocol === "file:") {
    const displayedNumber = document.querySelector("[data-phone-link]")?.getAttribute("href")?.replace(/\D/g, "");
    if (displayedNumber) {
      applyContent({ contact: { whatsappNumber: displayedNumber } });
    }
    return;
  }

  fetch("content/site.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(applyContent)
    .catch((error) => {
      console.error("No se pudo cargar content/site.json; se conserva el contenido incluido en la página.", error);
    });
})();
