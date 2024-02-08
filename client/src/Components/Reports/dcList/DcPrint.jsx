import React from 'react'
import html2pdf from 'html2pdf.js';

const DcPrint = (data) => {

  const handleGeneratePDF = () => {
    const element = document.getElementById('content-to-print');
    html2pdf().from(element).save('your-file-name.pdf');
  };
  const { selectedRows } = data
  console.log(data)
  return (
    <div id="content-to-print" style={{margin: "5px", border: "1px solid"}}>
      <h1>Headin</h1>
      <p>Title</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et aliquam arcu, consectetur semper nisi. Nulla convallis sodales eros, nec pellentesque massa convallis sed. Suspendisse ullamcorper nisl quis nisl lobortis consequat. Duis ut lectus vitae erat dignissim molestie non et mi. Fusce vitae egestas metus, vitae laoreet leo. In porta non neque at blandit. Sed vel porta orci, egestas interdum orci. Vivamus condimentum sit amet arcu nec sollicitudin. Nam dolor turpis, laoreet at lorem ac, aliquam vestibulum justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean tempor leo non hendrerit rutrum.

        Mauris venenatis augue ut diam bibendum porttitor. Sed viverra auctor massa ac tincidunt. Nullam mollis sit amet nibh quis sodales. Curabitur nec neque eu magna egestas aliquam non quis sem. Nam nisl tellus, ultrices in consectetur vel, hendrerit sed felis. Etiam posuere, nunc eget congue pellentesque, diam diam molestie dui, nec pretium lectus eros vitae sem. Etiam volutpat urna tortor, in ultricies est porta aliquam. Nulla quis tortor eget erat fermentum porta. Pellentesque maximus at lacus sit amet eleifend. Duis egestas orci at nibh varius blandit. Proin consequat volutpat scelerisque.

        Phasellus porta venenatis ante et pulvinar. Fusce tellus nisl, iaculis at mi venenatis, commodo pulvinar orci. Vivamus eget rutrum eros, id facilisis dui. Duis mattis nulla leo, sit amet dignissim enim faucibus ut. Maecenas et sagittis tortor. Etiam odio mi, pretium quis suscipit sit amet, faucibus nec quam. In quis bibendum diam, quis vulputate nisl. Quisque vel dui sed lorem venenatis faucibus. Donec at dolor quam. Etiam faucibus diam ac dui aliquet, at pharetra ligula tristique.

        Fusce in pellentesque tortor. Nunc leo velit, efficitur quis augue non, molestie feugiat tortor. Sed lorem metus, semper a nisi id, volutpat consequat nulla. Morbi ultricies sapien in ligula scelerisque, non pretium urna posuere. Curabitur rutrum et ex ut pellentesque. Nulla placerat ut augue a euismod. Nullam laoreet in quam non pharetra. Curabitur tempus id turpis et consequat. Suspendisse pulvinar porttitor mi, ut consequat magna euismod id.

        Curabitur dapibus erat elit, eu congue enim luctus nec. Etiam eget massa vehicula, lacinia eros eu, consequat ex. Curabitur pretium felis augue, ut tempor lorem sagittis hendrerit. Nullam placerat massa et arcu ullamcorper blandit. In libero nisl, pellentesque rutrum dapibus vel, cursus sed eros. Morbi lobortis ultrices eros id porttitor. Donec sit amet enim tellus. Fusce elementum diam ac ipsum dignissim posuere. Donec nec justo ex. Etiam consectetur turpis id leo tempor tincidunt. Morbi cursus, ante vel pretium rutrum, sapien libero efficitur lacus, ac pellentesque velit augue sit amet metus. Nunc sapien erat, ultricies eget libero eu, pretium vestibulum felis. Donec ullamcorper placerat erat, eget dignissim lacus imperdiet eu. Ut vehicula ac diam in malesuada. Pellentesque ligula quam, lacinia ac lacus nec, viverra ullamcorper odio. Aliquam aliquam mollis nibh, eget suscipit erat.</p>
      {/* Add more content here if needed */}
    </div>
  )
}

export default DcPrint