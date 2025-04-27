async function loadTemplate(srcObject, template, useUrl = false) {
  if (typeof template !== "string" || typeof srcObject !== "object") return;

  const content = useUrl ? template : await loadFile(template);

  const reformed = content.split("??").map((part) => srcObject?.[part] ?? part);

  return reformed.join("");
}
async function loadFile(templateUrl) {
  const loadedFile = await fetch(templateUrl);

  return loadedFile.text();
}
