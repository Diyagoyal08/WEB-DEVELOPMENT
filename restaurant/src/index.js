 const content = document.getElementById('content');

document.getElementById('home-btn').addEventListener('click', () => {
  content.innerHTML = `
    <section>
      <h2>WELCOME BACK !!</h2>
      <h4>Since 1980</h4>
      <p>Authentic Indian flavors, crafted with tradition.</p>
    </section>
  `;
});

document.getElementById('menu-btn').addEventListener('click', () => {
  content.innerHTML = `
    <section>
      <h2>Our Menu</h2>
      <ul>
        <li>Butter Chicken - ₹350</li>
        <li>Paneer Tikka - ₹250</li>
        <li>Biryani (Veg/Chicken) - ₹300/₹400</li>
        <li>Masala Dosa - ₹150</li>
        <li>Gulab Jamun - ₹80</li>
      </ul>
    </section>
  `;
});

document.getElementById('contact-btn').addEventListener('click', () => {
  content.innerHTML = `
    <section>
      <h2>Contact</h2>
      <p>Phone: +91 98765 43210<br>Email: hello@skyfall.example</p>
    </section>
  `;
});
