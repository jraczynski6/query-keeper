import queryTemplates from "./queryTemplates";

export function generateQuery({templateId, author, agent, title, wordCount, genre}) {
    if (!templateId || !author) return "";

    const selectedTemplate = queryTemplates.find(template => template.id === parseInt(templateId));
    if (!selectedTemplate) return "";

    return selectedTemplate.template({ agent, author, title, wordCount, genre});
}