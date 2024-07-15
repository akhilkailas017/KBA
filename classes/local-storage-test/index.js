// index.js

// Function to store certificate data
function storeCertificateData() {
    const course = document.querySelector('select[name="course"]').value;
    const certId = document.querySelector('input[name="name"]').value;
    const candidateName = document.querySelector('input[name="cname"]').value;
    const grade = document.querySelector('select[name="grade"]').value;
    const issueDate = document.querySelector('input[name="issuedate"]').value;

    // Create certificate object
    const certificate = {
        course,
        certId,
        candidateName,
        grade,
        issueDate
    };

    // Store certificate object in localStorage
    localStorage.setItem(certId, JSON.stringify(certificate));
}

// Function to retrieve certificate data
function retrieveCertificateData(certId) {
    const certificate = localStorage.getItem(certId);
    return certificate ? JSON.parse(certificate) : null;
}

// Add event listener to the form on issueCertificate.html
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    storeCertificateData();
    alert('Certificate issued successfully!');
    this.reset();
});
