import { useState } from 'react'
import { Button, Container, Title, Text, Card, Group, Stack } from '@mantine/core'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full max-w-md">
        <Stack gap="md" align="center">
          <Group>
            <a href="https://vite.dev" target="_blank" className="hover:scale-110 transition-transform">
              <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" className="hover:scale-110 transition-transform">
              <img src={reactLogo} className="h-16 w-16 animate-spin" alt="React logo" />
            </a>
          </Group>
          
          <Title order={1} className="text-3xl font-bold text-gray-800">
            Vite + React + Mantine + Tailwind
          </Title>
          
          <Text size="sm" c="dimmed" className="text-center">
            Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/App.tsx</code> and save to test HMR
          </Text>
          
          <Button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Count is {count}
          </Button>
          
          <Text size="xs" c="dimmed" className="text-center">
            Click on the Vite and React logos to learn more
          </Text>
        </Stack>
      </Card>
    </Container>
  )
}

export default App
