function enableObserver(target:HTMLElement) {
    function handleObserver(entries:IntersectionObserverEntry[],_:IntersectionObserver):void {
        entries.forEach(x => {
            if (x.isIntersecting) {
                target.classList.remove('invisible');
                target.classList.add('visible');
            }
        });
    }
    
    const observer = new IntersectionObserver(handleObserver,{
        threshold:1.0
    });
    observer.observe(target);
}

export default enableObserver;