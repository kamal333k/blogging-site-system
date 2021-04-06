import {requestUrl} from './handlers.js';

function getIdLink(id, req, category, reference) {
    return {
        name: reference,
        rel: reference,
        href: `${requestUrl(req)}/${category}/${id}`
    }
}

function getPageLink(req, url, reference) {
    return {
        name: reference,
        rel: reference,
        href: `${requestUrl(req)}${url}`
    }
}
function getPaginationLinks(app, category, req, result) {
    const links = [];
    const response = {};
    response[category] = result;
    const q = req.query;
    let count = q._count || DEFAULT_COUNT;
    const shouldIncludeNextPrev = result.length >= count;
    
    if(q.hasOwnProperty('_index')){
        q._index = parseInt(q._index);
    }
    if(q.hasOwnProperty('_count')){
        count = parseInt(count);
    }
    links.push(getPageLink(req, req.url, 'self'));
    if(shouldIncludeNextPrev){
        if(q.hasOwnProperty('_index') && q.hasOwnProperty('_count')){
            
            // add next & prev props
            response.next = q._index + count;
            
            let url = req.url.replace(`_index=${q._index}`, `_index=${response.next}`);
            links.push(getPageLink(req, url, 'next'));
            if((q._index - count) < 0){
                response.prev = 0;
            }else{
                response.prev = q._index - count;   
            }
            url = req.url.replace(`_index=${q._index}`, `_index=${response.prev}`);
            links.push(getPageLink(req, url, 'prev'));
        }else if(q.hasOwnProperty('_count')){
            let separator = Object.entries(q).length > 0 ? "&" : "";
            let url = req.url + separator + `_index=${count}`;
            links.push(getPageLink(req, url, 'next'));
             // add next & prev props
            response.next = count;
        }else if(q.hasOwnProperty('_index')){
            // add next & prev props
            response.next = q._index + count;
            let url = req.url.replace(`_index=${q._index}`, `_index=${response.next}`);
            links.push(getPageLink(req, url, 'next'));
            if((q._index - DEFAULT_COUNT) < 0){
                response.prev = 0;
            }else{
                response.prev = q._index - count;
            }
            url = req.url.replace(`_index=${q._index}`, `_index=${response.prev}`);
            links.push(getPageLink(req, url, 'prev'));
        }else{
            let separator = Object.entries(q).length > 0 ? "&" : "?";
            let url = req.url + separator + `_index=${DEFAULT_COUNT}`;
            links.push(getPageLink(req, url, 'next'));
            // add next & prev props
            response.next = DEFAULT_COUNT;
        }
    }
    response.links = links;
    return response;
}

function getLinks(app, category, req, element) {
    const links = [];
    
    switch (category) {
        case 'users':
            links.push(getIdLink(element.id, req, 'users', 'self' ));
            break;
        case 'articles':
            links.push(getIdLink(element.id, req, 'articles', 'self' ));
            links.push(getIdLink(element.authorId, req, 'users', 'author' ));
            break;
        case 'comments':
            links.push(getIdLink(element.id, req, 'comments', 'self' ));
            links.push(getIdLink(element.commenterId, req, 'users', 'commenter' ));
            links.push(getIdLink(element.articleId, req, 'articles', 'article' ));
            break;  
        default:
            break;
    }
    element['links'] = links;

}

export default function responseWithLinksAndPagination(app, category, req, result){
    if(result.length>1){
        result.forEach(element => {
            getLinks(app, category, req, element);
        });
        return getPaginationLinks(app, category, req, result)
    }else{
        getLinks(app, category, req, result[0]);
        const response = {};
        response[category] = result
        return response;
    }
    // return result;
}

const DEFAULT_COUNT = 5;
