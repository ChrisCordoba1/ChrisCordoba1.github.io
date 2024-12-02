document.addEventListener('DOMContentLoaded', () => {
    var citButton = document.getElementById('cit-button');
    var busButton = document.getElementById('bus-button');
    var studentsContainer = document.getElementById('students-container');

    async function fetchStudents() {
        var response = await fetch('cit5students.json');
        return response.json();
    }

    function renderStudents(students) {
        var templateSource = `
            <table border="1" style="margin: 20px auto; text-align: center; width: 80%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Major</th>
                        <th>Midterm</th>
                        <th>Final</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each this}}
                    <tr>
                        <td>{{name}}</td>
                        <td>{{major}}</td>
                        <td>{{midterm}}</td>
                        <td>{{final}}</td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>
        `;
        var template = Handlebars.compile(templateSource);
        studentsContainer.innerHTML = template(students);
    }

    citButton.addEventListener('click', async () => {
        var students = await fetchStudents();
        var citStudents = students.filter(student => student.major === 'CIT');
        renderStudents(citStudents);
    });

    busButton.addEventListener('click', async () => {
        var students = await fetchStudents();
        var busStudents = students.filter(student => student.major === 'BUS');
        renderStudents(busStudents);
    });
});
