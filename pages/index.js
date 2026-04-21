import { Button, CircularProgress, Container } from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

const styles = {
  main: { textAlign: 'center', padding: '3rem 0 5rem 0' },
  image: { marginBottom: '20px' },
  question: {
    marginTop: '20px',
    marginBottom: '28px',
    padding: '0',
    fontSize: '26px',
    color: '#2D6BB5',
    fontWeight: 600,
  },
  buttonRow: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginTop: '12px',
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
        <div className="logo-container" style={styles.image}>
          <Image src="/logo.jpg" alt="Sport-fun" width="350" height="200" />
        </div>

        {redirecting && <CircularProgress style={{ marginTop: 100 }} />}

        {!redirecting && (
          <div className="question-card">
            <div style={styles.question}>האם אתם מנויים בפארק המים רעות?</div>
            <div style={styles.buttonRow}>
              <Button
                className="btn-outline"
                onClick={() => redirect('/register?form=manui')}
              >
                כן
              </Button>
              <Button
                className="btn-outline"
                onClick={() => redirect(`/register?form=${router.query.form}`)}
              >
                לא
              </Button>
            </div>
          </div>
        )}
      </main>
    </Container>
  )
}

export default Home
