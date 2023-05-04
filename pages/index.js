import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Container, Link } from '@material-ui/core'

const styles = {
  main: { textAlign: 'center', padding: '1rem 0 5rem 0' },
  image: { marginBottom: '20px' },
  question: {
    marginTop: '50px',
    padding: '20px',
    fontSize: '26px',
    color: '#2D6BB5',
  },
  link: {
    margin: '30px',
    padding: '10px',
    border: '2px solid #2D6BB5',
    borderRadius: '10px',
    fontSize: '26px',
    color: '#2D6BB5',
  },
}

const Home = () => {
  const router = useRouter()

  if (router.query.form === 'manui') {
    router.push(`/register?form=manui&productId=${router.query.productId}`)
    return 'Redirecting...'
  }

  return (
    <Container maxWidth="sm">
      <Head>
        <title>Sport-Fun</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={styles.main}>
        <div style={styles.image}>
          <Image src="/logo.jpg" alt="Sport-fun" width="350" height="200" />
        </div>

        <div style={styles.question}>האם את/ה מנוי/ה של פארק המים?</div>
        <NextLink
          href={`/register?form=manui&productId=${router.query.productId}`}
          passHref
        >
          <Link style={styles.link}>כן</Link>
        </NextLink>
        <NextLink
          href={`/register?form=${router.query.form}&productId=${router.query.productId}`}
          passHref
        >
          <Link style={styles.link}>לא</Link>
        </NextLink>
      </main>
    </Container>
  )
}

export default Home
