from flask import Flask, render_template, request, url_for
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

app = Flask(__name__, 
    template_folder='templates',  # Make sure this points to correct folder
    static_folder='static'
)

@app.errorhandler(500)
def internal_error(error):
    app.logger.error(f'Server Error: {error}')
    return "Internal Server Error", 500

@app.errorhandler(404)
def not_found_error(error):
    return "Page Not Found", 404

@app.route('/') 
def index():
    return render_template('index.html')

@app.route('/about')  # Change from '/about.html'
def about():
    return render_template('about.html')

@app.route('/contact')  # Change from '/contact.html'
def contact():
    return render_template('contact.html')

@app.route('/services')  # Change from '/services.html'
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


