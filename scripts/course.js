const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

const courseList = document.querySelector("#course-list");
const totalCredits = document.querySelector("#total-credits");

function displayCourses(courseArray) {

    courseList.innerHTML = "";

    courseArray.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <strong>${course.subject} ${course.number}</strong>
            <br>
            ${course.title}
            <br>
            ${course.credits} Credits
        `;

        courseList.appendChild(card);
    });

    const credits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = credits;
}

document.querySelector("#all-courses").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd-courses").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

document.querySelector("#cse-courses").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});

displayCourses(courses);