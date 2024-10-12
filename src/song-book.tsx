"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Share2, Search, Music2, Book, Church } from "lucide-react"
import { toast, Toaster } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const songs = [
  { title: "Amazing Grace", lyrics: "Amazing grace! How sweet the sound\nThat saved a wretch like me!" },
  { title: "How Great Thou Art", lyrics: "O Lord my God, When I in awesome wonder,\nConsider all the worlds Thy Hands have made" },
  { title: "It Is Well With My Soul", lyrics: "When peace like a river, attendeth my way,\nWhen sorrows like sea billows roll" },
  { title: "What a Friend We Have in Jesus", lyrics: "What a friend we have in Jesus,\nAll our sins and griefs to bear!" },
  { title: "Great Is Thy Faithfulness", lyrics: "Great is Thy faithfulness, O God my Father,\nThere is no shadow of turning with Thee" },
  { title: "Holy, Holy, Holy", lyrics: "Holy, Holy, Holy! Lord God Almighty!\nEarly in the morning our song shall rise to thee" },
  { title: "Be Thou My Vision", lyrics: "Be Thou my Vision, O Lord of my heart;\nNaught be all else to me, save that Thou art" },
  { title: "The Old Rugged Cross", lyrics: "On a hill far away stood an old rugged cross,\nThe emblem of suffering and shame" },
  { title: "How Great Is Our God", lyrics: "The splendor of a King, clothed in majesty\nLet all the Earth rejoice" },
  { title: "10,000 Reasons (Bless the Lord)", lyrics: "Bless the Lord, O my soul\nO my soul, worship His holy Name" },
  { title: "In Christ Alone", lyrics: "In Christ alone my hope is found,\nHe is my light, my strength, my song" },
  { title: "Blessed Assurance", lyrics: "Blessed assurance, Jesus is mine!\nOh, what a foretaste of glory divine!" },
  { title: "This Is My Father's World", lyrics: "This is my Father's world,\nAnd to my listening ears" },
  { title: "I Surrender All", lyrics: "All to Jesus I surrender,\nAll to Him I freely give" },
  { title: "Shout to the Lord", lyrics: "My Jesus, my Savior\nLord, there is none like You" },
  { title: "Here I Am to Worship", lyrics: "Light of the world, You stepped down into darkness\nOpened my eyes, let me see" },
  { title: "Cornerstone", lyrics: "My hope is built on nothing less\nThan Jesus' blood and righteousness" },
  { title: "Oceans (Where Feet May Fail)", lyrics: "You call me out upon the waters\nThe great unknown where feet may fail" },
  { title: "Good Good Father", lyrics: "I've heard a thousand stories of what they think You're like\nBut I've heard the tender whisper of love in the dead of night" },
  { title: "What a Beautiful Name", lyrics: "You were the Word at the beginning\nOne with God the Lord Most High" }
]

const bibleVerses = [
  { reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
  { reference: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing." },
  { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
  { reference: "Philippians 4:13", text: "I can do all this through him who gives me strength." },
  { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." }
]

export default function SongBook() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("songs")

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const shareSong = async (song: string) => {
    const songUrl = `https://example.com/songs/${encodeURIComponent(song)}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: song,
          text: `Check out this song: ${song}`,
          url: songUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(songUrl).then(() => {
        toast.success("Link copied to clipboard!")
      }, () => {
        toast.error("Failed to copy link")
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      <header className="bg-primary text-primary-foreground py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Church className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Calvary Family</h1>
          </div>
        </div>
      </header>
      <div className="sticky top-0 z-10 bg-background shadow-md">
        <div className="container mx-auto px-4 py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="songs">Songs</TabsTrigger>
              <TabsTrigger value="verses">Bible Verses</TabsTrigger>
            </TabsList>
            {activeTab === "songs" && (
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search songs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}
          </Tabs>
        </div>
      </div>
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab}>
          <TabsContent value="songs">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredSongs.map((song, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Music2 className="mr-2" />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="link" className="p-0 h-auto font-semibold">{song.title}</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{song.title}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="whitespace-pre-line">{song.lyrics}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-gray-500">
                      Hymn • Traditional
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => shareSong(song.title)}>
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="verses">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {bibleVerses.map((verse, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Book className="mr-2" />
                      {verse.reference}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm">{verse.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}