# M-TREAT

## Project Overview
M-TREAT is a web-based project with a Django backend, built using Python and PostgreSQL.

## How to Get Started

### Clone the Repository
Copy and paste the command below into your terminal to clone the repository:

```bash
git clone git@github.com:clairemuiru1/m-treat.git

Navigate into the Project
Once the repository is cloned, navigate into the project directory:

```bash
Copy code
cd M-TREAT
Backend Setup
The backend is a Django project using Python and PostgreSQL. Follow the steps below to set up and run the backend:

1. Create a Virtual Environment
To isolate the project dependencies, create and activate a virtual environment:

bash
Copy code
python -m venv venv
source venv/bin/activate  
2. Install Dependencies
Install the required Python packages using pip:

bash
Copy code
pip install -r requirements.txt
3. Set Up the Database
Ensure that PostgreSQL is installed and running on your machine. Then, create a PostgreSQL database for the project:

bash
Copy code

createdb m_treat_db

python manage.py migrate
4. Set Up Environment Variables
Create a .env file in the root directory to store sensitive information like database credentials and secret keys. Here's an example of what the .env file might look like:

makefile
Copy code
DATABASE_URL=postgres://username:password@localhost/m_treat_db
SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost
Replace username, password, and other fields with your specific values.

5. Run the Django Server
Once the database is set up, you can run the Django development server:

bash
Copy code
python manage.py runserver
The backend should now be running at http://localhost:8000.

Frontend Setup (Optional)
If you also have a frontend for this project (e.g., React, Vue), you can follow these steps to set it up.

1. Install Node.js and npm
If you don't have Node.js and npm installed, download and install them from Node.js official website.

2. Install Frontend Dependencies
Navigate to the frontend directory (e.g., frontend/), and install the required dependencies:

bash
Copy code
cd Client
npm install
3. Run the Frontend Development Server
Once the dependencies are installed, you can start the frontend server:

bash
Copy code
npm run dev
The frontend should now be running at http://localhost:5173.

Testing
To run tests for both the backend and frontend, follow these steps:

Backend Tests
Run the Django tests with the following command:

bash
Copy code
python manage.py test
Frontend Tests
If you have frontend tests, you can run them using:

bash
Copy code
npm test
Deployment
For deployment, you can deploy both the backend and frontend to platforms such as Heroku, AWS, or DigitalOcean. Ensure that you configure your environment variables, set up PostgreSQL, and make your project production-ready.

Contributing
We welcome contributions to the project. If you want to contribute, please follow these steps:

Fork the repository.
Create a new branch.
Make your changes.
Submit a pull request with a description of your changes.
