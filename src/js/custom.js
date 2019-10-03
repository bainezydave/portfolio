(() =>
{

    let main = document.getElementById("container"),
        pages = document.getElementsByClassName("page"),
        lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    main.onscroll = () =>
    {
        for (let i = 0; i < pages.length; i++) 
        {
            let currentPage = pages[i];
            let pageName = currentPage.dataset.pageName;
            
            if ( ((currentPage.offsetTop - currentPage.clientHeight) - main.scrollTop <= -100) )
            {
                document.querySelector("nav li.active").classList.remove("active");   
                document.querySelector(`nav ul li[data-page-name='${pageName}']`).classList.add("active");

                document.querySelector(`section[data-page-name='${pageName}']`).classList.add("active");
            }
        }
    };

    document.querySelectorAll('nav ul a[href^="#"]').forEach(page => 
    {
        page.addEventListener('click', function(el) 
        {
            el.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView(
            {
                behavior: 'smooth'
            });
        });
    });


    if ("IntersectionObserver" in window)
    {
        let lazyImageObserver = new IntersectionObserver( entries =>
        {
            entries.forEach( entry =>
            {
                if (entry.isIntersecting)
                {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach( lazyImage =>
        {
            lazyImageObserver.observe(lazyImage);
        });
    }


})();
