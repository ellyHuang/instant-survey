const keys = require('../../config/keys');

module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style='text-align:center;'>
                    <h3 style="margin: 0;">This is the survey email template</h3>
                    <p style="margin: 0; padding: 10px; font-size: 18px;">Please fill out the follow questionnaire</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/responded">Yes</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/responded">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
}