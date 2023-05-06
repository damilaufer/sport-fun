import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button, CircularProgress, Container } from '@material-ui/core'
import { useState } from 'react'

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
    textDecoration: 'none',
  },
}

const Home = () => {
  const router = useRouter()
  const [redirecting, setRedirecting] = useState(false)

  if (router.query.form === 'group') {
    router.push('/register?form=group')
    return 'Redirecting...'
  }

  function redirect(url) {
    router.push(url)
    setRedirecting(true)
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

        {redirecting && <CircularProgress style={{ marginTop: 100 }} />}

        {!redirecting && (
          <div>
            <div style={styles.question}>האם אתם מנויים בפארק המים רעות?</div>
            <Button
              style={styles.link}
              onClick={() => redirect('/register?form=manui')}
            >
              כן
            </Button>
            <Button
              style={styles.link}
              onClick={() => redirect(`/register?form=${router.query.form}`)}
            >
              לא
            </Button>
          </div>
        )}
      </main>
    </Container>
  )
}

export default Home
