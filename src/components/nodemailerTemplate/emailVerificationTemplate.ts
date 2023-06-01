export const emailVerificationTemplate = (title: string, message: string, link: string) => {
    return `
        <html>
            <head>
                <style>
                    /* CSS Styles */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f8f8f8;
                        padding: 20px;
                    }
                    
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    
                    .header {
                        padding: 20px;
                        background-color: #1e88e5;
                        color: #ffffff;
                        border-top-left-radius: 5px;
                        border-top-right-radius: 5px;
                    }
                    
                    h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    
                    .content {
                        padding: 20px;
                    }
                    
                    p {
                        margin-bottom: 20px;
                        font-size: 16px;
                        line-height: 1.5;
                    }
                    
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #1e88e5;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 3px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>${title}</h1>
                    </div>
                    <div class="content">
                        <p>${message}</p>
                        <a class="button" href=${link}>Click Here</a>
                    </div>
                </div>
            </body>
        </html>
    `
}