//================ FUNCTION FOR DISPLAYING IMAGE FILE ON THE SCREEN ===========

function displayImage() {
  var input = document.getElementById("input_flower");
  var img = document.querySelector(".flower-image");

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      img.src = e.target.result;
    }

    reader.readAsDataURL(input.files[0]);
  }
}

//================ FUNCTION FOR FETCHING AND DISPLAYING THE INFO OF THE FLOWER ===========

function sendIdentification() {
  const files = [...document.querySelector('input[type=file]').files];
  // document.getElementById("plant_image").innerHTML = files;
  const promises = files.map((file) => {
    return new Promise((resolve, reject) => { 
        const reader = new FileReader();
        reader.onload = (event) => {
          const res = event.target.result;
          // console.log(res);
          resolve(res);
        }
        reader.readAsDataURL(file)
    })
  })
  
  Promise.all(promises).then((base64files) => {
  //   console.log(base64files)
          
    const data = {
      api_key: "1oARzh7Yq1vvpbmpZNJHq3XNbQa12ApQT37xg0g7SZwjiz8HJG",
      images: base64files,
      // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      // plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
      plant_details: ["common_names",
                      "url",
                      "name_authority",
                      "wiki_description",
                      "taxonomy",
                      "synonyms"],
    };
    
    fetch('https://api.plant.id/v2/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data.suggestions[0].plant_name);
      document.getElementById("scientific_name").innerHTML = data.suggestions[0].plant_details.scientific_name;
      document.getElementById("common_name").innerHTML = data.suggestions[0].plant_details.common_names[0];
      document.getElementById("family").innerHTML = data.suggestions[0].plant_details.taxonomy.family;
      document.getElementById("genus").innerHTML = data.suggestions[0].plant_details.taxonomy.genus;
      // document.getElementById("species").innerHTML = data.suggestions[0].plant_details.taxonomy.species;      

      
      console.log('Success:', data.suggestions[0].plant_details.common_names[0]);
      // console.log('Success:', data.suggestions[0].plant_details.taxonomy);
    }
    )
    .catch((error) => {
      console.error('Error:', error);
    });
  })

};

 



