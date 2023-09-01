const Api_Key = "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";

const submitIcon = document.querySelector('#submit-btn');
const inputElement = document.querySelector("input");
const imageSection = document.querySelector(".images-section")
const clearImagesButton = document.querySelector(".delete-button");
const imagesSection = document.querySelector(".images-section");

let lastRequestTime = 0;  // Variable to track the time of the last request

clearImagesButton.addEventListener("click", function() {
        imagesSection.innerHTML = ""; // Clear the content of images-section
});


const getImages = async () => {
    const currentTime = new Date().getTime();  // Get current time in milliseconds
    const timeSinceLastRequest = currentTime - lastRequestTime;

    // Check if enough time has passed since the last request (e.g., wait at least 2 seconds)
    if (timeSinceLastRequest < 2000) {
        console.log("Too many requests. Please wait before making another request.");
        return;
    }

    lastRequestTime = currentTime;  // Update the last request time

    const options = {
        method: "POST",  // Use the POST method
        headers: {
            "Authorization": `Bearer ${Api_Key}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: inputElement.value,
            n: 4,
            size: "1024x1024"
        })
    };
    
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", options);
        const data = await response.json();
        console.log(data);

        data?.data.forEach(imageObject =>{
         const imageContainer = document.createElement("div")
         imageContainer.classList.add("image-container")
         const imageElement = document.createElement("img")
         imageElement.setAttribute("src", imageObject.url)
         imageContainer.append(imageElement)
         imageSection.append(imageContainer)

        })

    } catch (error) {
        console.log(error);
    }
};

submitIcon.addEventListener('click', getImages);
