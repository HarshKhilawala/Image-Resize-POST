$(document).ready(function (e) {
         
    function ResizeImage(dis) {
        var filesToUpload = document.getElementById('imageFile').files;
        var file = filesToUpload[0];
          
        // Create an image
        var img = document.createElement("img");
        // Create a file reader
        var reader = new FileReader();
        // Set the image once loaded into file reader
        reader.onload = function(e) {
        //img.src = e.target.result;
          
        // var toWidth = document.getElementById("width");
        // toWidth = parseInt(toWidth.value);
    
        // var toHeight = document.getElementById("height");
        // toHeight = parseInt(toHeight.value);
        
        var img = new Image();
          
        img.src = this.result;
      
        setTimeout(function(){
            var canvas = document.createElement("canvas");
              
            var width = img.width;
            var height = img.height;

            toWidth = 1080;
            toHeight = (height * toWidth)/width;
            
            // if(toHeight===0 && toWidth===0){
            //     alert("Please Enter either Width or Height");
            // }else if(toHeight===0){
            //     toHeight = (height * toWidth)/width;
            // }else if(toWidth===0){
            //     toWidth = (width * toHeight)/height;
            // }else{
            //     toHeight = (height * toWidth)/width;
            // }
                
            
            canvas.width = toWidth;
            canvas.height = toHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, toWidth, toHeight);
            var dataurl = canvas.toDataURL("image/jpeg");
            //document.getElementById('output').src = dataurl;
                 
            $("#imageFile").val(dataurl);
                
                //console.log(canvas);
                 
                $.ajax({
                    url: "https://38af02e14949.ngrok.io/api/form/",
                    type: "POST",
                    data:  new FormData(dis),
                    contentType: false,
                    cache: false,
                    processData:false,
                    success: function(data)
                    {
                        $("#targetLayer").html(data);
                    },
                    error: function() 
                    {
                    }           
               })
                         
            },200);
            }
            // Load files into file reader
            // console.log(file);
             
            reader.readAsDataURL(file);
        }
     
     
        $("#uploadForm").on('submit',(function(e) {
        e.preventDefault();
     
    //console.log("Form ", new FormData(this));
        ResizeImage(this);
         
   //);
}));
});