import queryTemplates from "./queryTemplates";

export function generateQuery({templateId, author, agent, title, wordCount, genre}) {

    //fallback
    if (!templateId || !author) return "";

    //search templates for matching id
    const selectedTemplate = queryTemplates.find(template => template.id === parseInt(templateId)); // parseInt will match number if string
    if (!selectedTemplate) return "";

    return selectedTemplate.template({ agent, author, title, wordCount, genre});
}