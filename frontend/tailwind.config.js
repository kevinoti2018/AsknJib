/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors:{
      primaryContainer:'#F8F9F9',
      secondaryContainer:'#CDE9FE',
      tertiaryContainer:'#E3E6E8',
      primary:'#0A95FF',
      secondary:'#F2740D',
      questionC:'#6B74CC',
      content:'#525960',
      footer:'#393E43',
      white:'#fff'
    },
    extend: {
     width:{
      customs:"160px",
      custom:'200px',
      custom1: '300px',
      custom2:'400px',
      custom2:'500px',
      custom3:'600px',
      custom4:'700px'
     },
     height:{
      cust:"100vh"
     }
     
    },
  },
  plugins: [],
}