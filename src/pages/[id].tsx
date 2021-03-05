import Image from 'next/image'
import { useRouter } from 'next/router'

const zeroWidthToBinary = string => (
    string.split('').map((char) => { // zero-width no-break space
        if (char === '​') { // zero-width space
            return '1';
        } else if (char === '‌') {  // zero-width non-joiner
            return '0';
        }
        return ' '; // add single space
    }).join('')
);

const binaryToText = string => (
    string.split(' ').map(num =>
        String.fromCharCode(parseInt(num, 2))).join('')
);

export default function Hoster({ URL }) {
    let router = useRouter()
    let { id } = router.query
    id = binaryToText(zeroWidthToBinary(id))
    console.log(id)
    return <Image src={'/' + id} layout='fill' />
}

export async function getServerSideProps({ params }) {
    console.log(binaryToText(zeroWidthToBinary(params.id)))
    return {
        props: {
            url: binaryToText(zeroWidthToBinary(params.id))
        }
    }
}