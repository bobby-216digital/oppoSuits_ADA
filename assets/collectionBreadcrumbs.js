document.addEventListener('DOMContentLoaded', e => {
    let collectionBreadcrumbs = {
        collectionBreadcrumb: document.querySelector('.js-collection-breadcrumb'),
        referrerLink: new URL(document.referrer),
        collectionBreadcrumbLink: '',
        async init() {
            if(this.collectionBreadcrumb) {
                this.collectionBreadcrumbLink = this.collectionBreadcrumb.querySelector('a');
                if(this.referrerLink.pathname.includes('/collections') && !this.referrerLink.pathname.includes('/collections/products')){
                    let data = await this.fetchCollectionJson();
                    if(data.collection){
                        this.collectionBreadcrumbLink.href = this.referrerLink.origin + this.referrerLink.pathname;
                        this.collectionBreadcrumbLink.textContent = data.collection.title;
                        this.collectionBreadcrumb.classList.remove('hidden');
                    }
                    
                }
            }
        },
        async fetchCollectionJson(){
            let referrerLinkObject = new URL(this.referrerLink);

            let response = await fetch(`${this.referrerLink.origin + this.referrerLink.pathname}.json`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                }
            });
        
            let data = await response.json();
        
            return data;
        }
    }
    
    collectionBreadcrumbs.init();
});