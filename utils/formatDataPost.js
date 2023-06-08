export default function FormatDataPost(arrPost) {
    let formatData = [];
    arrPost.length > 0 && arrPost?.map(item=>{
        formatData.push({
            ...item,time: item?.time.replace('2021','2023')
        })
    })
    return formatData;
}