export default function PublicLink({url,title,key}){
    return (<div key={key}>
    <a href={url}>{title}</a>
</div>)
}