$(function () {   
     
    
const query = `
{
  products(first: 8) {
    edges {
      node {
        id
        title
        description
        images(first: 2) {
          edges {
            node {
              originalSrc
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}
`;


async function fetchProducts() {
  const response = await fetch('https://tsodykteststore.myshopify.com/api/2023-01/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '7e174585a317d187255660745da44cc7', 
    },
    body: JSON.stringify({ query }) 
  });

  const result = await response.json(); 
  return result.data.products.edges; 
}


async function renderProducts() {
  const products = await fetchProducts(); 
  const container = document.querySelector('.featured-products__cards'); 

  
  products.forEach(product => {
    const { node: { title, description, images, priceRange } } = product;

    
    const defaultImageSrc = 'images/mop.png'; 
    const secondImageSrc = images.edges.length > 1 ? images.edges[1].node.originalSrc : null;

    
    const productCard = document.createElement('div');
    productCard.classList.add('featured-products__card');

    
    const productCardHTML = `
      <div class="featured-products__card-top">
        <img class="featured-products__card-img" src="${defaultImageSrc}" alt="${title}">
      </div>
      <p class="featured-products__card-title">${title}</p>
      <p class="featured-products__card-text">${description || 'No description available'}</p>
      <div class="featured-products__price">
        <p class="featured-products__price-was">${priceRange.minVariantPrice.amount}</p>
        <p class="featured-products__price-now">${priceRange.minVariantPrice.amount}</p>
      </div>
    `;

    
    productCard.innerHTML = productCardHTML;
    container.appendChild(productCard); 

    
    productCard.querySelector('.featured-products__card-img').addEventListener('mouseover', () => {
      if (secondImageSrc) { 
        productCard.querySelector('.featured-products__card-img').src = secondImageSrc;
      }
    });

    productCard.querySelector('.featured-products__card-img').addEventListener('mouseout', () => {
     
      productCard.querySelector('.featured-products__card-img').src = defaultImageSrc;
    });
  });
}


renderProducts(); 
 
 

 
const questions = document.querySelectorAll('.faq__question');

questions.forEach(question => {
  
  const plusIcon = question.querySelector('.faq__icon-plus');
  const minusIcon = question.querySelector('.faq__icon-minus');
  const content = question.querySelector('.faq__question-content');

  
  question.querySelector('.faq__question-top').addEventListener('click', function () {
    
    content.classList.toggle('open');
    question.classList.toggle('open'); 

    if (content.classList.contains('open')) {
      content.style.maxHeight = content.scrollHeight + 'px'; 
      content.style.opacity = '1'; 
      plusIcon.style.display = 'none'; 
      minusIcon.style.display = 'block'; 
    } else {
      content.style.maxHeight = content.scrollHeight + 'px'; 
      content.style.opacity = '0'; 
      setTimeout(() => {
        content.style.maxHeight = '0'; 
      }, 10); 
      plusIcon.style.display = 'block'; 
      minusIcon.style.display = 'none'; 
    }
  });
});



  
 
  
 
  
  
  
  
     

 



  


  
  
   
});