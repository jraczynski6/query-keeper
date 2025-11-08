const queryTemplates = [
    {
        id: 1,
        name: "Formal Query",
        template: ({ agent, author, title, wordCount, genre }) => `
        Dear ${agent.firstName} ${agent.lastName},
        I am pleased to submit my manuscript titled "${title}", approximately ${wordCount} words, in the ${genre} genre. This work represents a story I have carefully developed, and I believe it aligns with your interests.

        As the author, I am available for any additional materials or clarifications you may require. My contact details are listed below:

Author: ${author.firstName} ${author.lastName}  
Email: ${author.email}  
Website: ${author.website || "N/A"}

Thank you for considering my submission. I would be thrilled to discuss the manuscript further and explore the possibility of working together.

Sincerely,  
${author.firstName} ${author.lastName}
`
    },
    {
        id: 2,
        name: "Casual template",
        template: ({ agent, author, title, wordCount, genre }) => `
        Hi ${agent.firstName},

I hope this message finds you well. I'm submitting my manuscript, "${title}", a ${genre} story of about ${wordCount} words that I think might align with your represented catalog.

I'd be delighted to provide additional information, a full synopsis, or answer any questions you may have.

Looking forward to hearing your thoughts!

Best regards,  
${author.firstName} ${author.lastName}  
Email: ${author.email}
        `
    }
];

export default queryTemplates;