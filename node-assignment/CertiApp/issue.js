
function storeCertificateData() {
    const course = document.querySelector('select[name="course"]').value;
    const certId = document.querySelector('input[name="name"]').value;
    const candidateName = document.querySelector('input[name="cname"]').value;
    const grade = document.querySelector('select[name="grade"]').value;
    const issueDate = document.querySelector('input[name="issuedate"]').value;

    const certificate = {
        course,
        certId,
        candidateName,
        grade,
        issueDate
    };

    localStorage.setItem(certId, JSON.stringify(certificate));
}


function retrieveCertificateData(certId) {
    const certificate = localStorage.getItem(certId);
    return certificate ? JSON.parse(certificate) : null;
}


document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    storeCertificateData();
    alert('Certificate issued successfully!');
    this.reset();
});
