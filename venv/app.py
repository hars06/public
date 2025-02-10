from flask import Flask, render_template, request, url_for
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, 
    template_folder='public',
    static_folder='.',
    static_url_path=''  # Add this line
)

# Set up static file serving
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # Add this line for development

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASSWORD')

mail = Mail(app)

@app.route('/')
@app.route('/index.html')  
def index():
    return render_template('index.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/services.html')
def services():
    return render_template('services.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        # Get form data
        name = request.form.get('name')
        phone = request.form.get('phone')
        email = request.form.get('email')
        message = request.form.get('message')

        # Create email message
        msg = Message('New Contact Form Submission from ODEMKEY',
                     sender=os.getenv('EMAIL_USER'),
                     recipients=[os.getenv('RECIPIENT_EMAIL')])
        
        msg.body = f'''
        New contact form submission:
        
        Name: {name}
        Phone: {phone}
        Email: {email}
        Message: {message}
        '''

        # Send email
        mail.send(msg)
        return 'Message sent successfully'
    except Exception as e:
        return f'An error occurred: {str(e)}'

if __name__ == '__main__':
    app.run(debug=True)


