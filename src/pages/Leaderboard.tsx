import { LeaderboardEntry, TableScrollArea } from "../components/LeaderboardComponent";
import "../styles/TableScrollArea.module.css";
import "../styles/LeaderboardPage.css";
import { useState } from "react";
import { Modal, Button, TextInput } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import "@mantine/core/styles.css";
import classes from "../styles/FloatingLabelInput.module.css";
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; //TODO: replace with actual server when it is up
const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        const database = client.db('myDatabase'); //TODO: Replace with actual database
        //@ts-expect-error ESLint and typescript are shitting themselves over the unused variable
        const collection = database.collection('myCollection'); //TODO: replace with actual connection

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        // Close the connection
        await client.close();
    }
}

run().catch(console.error);


const data: LeaderboardEntry[] = [
  {
    name: "Athena Weissnat",
    score: 1000000,
    date: new Date("2024-02-20"),
  },
  {
    name: "Deangelo Runolfsson",
    score: 900002,
    date: new Date("2024-02-20"),
  },
  {
    name: "Danny Carter",
    score: 900001,
    date: new Date("2024-02-20"),
  },
  {
    name: "Trace Tremblay PhD",
    score: 900000,
    date: new Date("2024-02-20"),
  },
  {
    name: "Derek Dibbert",
    score: 900007,
    date: new Date("2024-02-20"),
  },
  {
    name: "Viola Bernhard",
    score: 800000,
    date: new Date("2024-02-20"),
  },
  {
    name: "Austin Jacobi",
    score: 700000,
    date: new Date("2024-02-20"),
  },
  {
    name: "Hershel Mosciski",
    score: 600000,
    date: new Date("2024-02-20"),
  },
  {
    name: "Mylene Ebert",
    score: 500000,
    date: new Date("2024-02-20"),
  },
  {
    name: "Lou Trantow",
    score: 400000,
    date: new Date("2024-02-20"),
  },
  {
    name: "Dariana Weimann",
    score: 300000,
    date: new Date("2024-02-20"),
  },
  {
    name: "Dr. Christy Herman",
    score: 200000,
    date: new Date("2024-02-20"),
  },
  {
    name: "Katelin Schuster",
    score: 100000,
    date: new Date("2024-02-20"),
  },
  {
    name: "Melyna Macejkovic",
    score: 10000,
    date: new Date("2024-02-20"),
  },
  {
    name: "Pinkie Rice",
    score: 1000,
    date: new Date("2024-02-20"),
  },
  {
    name: "Brain Kreiger",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Myrtice McGlynn",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Chester Carter PhD",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Mrs. Ericka Bahringer",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Korbin Buckridge Sr.",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Dr. Daisy Becker",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Derrick Buckridge Sr.",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Ernie Hickle",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Jewell Littel",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Cyrus Howell",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Dr. Orie Jast",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Luisa Murphy",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Lea Witting",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Kelli Runolfsson",
    score: 100,
    date: new Date("2024-02-20"),
  },
  {
    name: "Brook Gaylord",
    score: 100,
    date: new Date("2024-02-20"),
  },
];

type Filter = "Today" | "This week" | "This month" | "This year" | "All-time";

const Leaderboard = () => {

  const [mode, setMode] = useState<Filter>("Today");
  const today = new Date();
  const filters = {
    "Today": (entry: LeaderboardEntry) => entry.date.getUTCFullYear() === today.getUTCFullYear() && entry.date.getUTCDate() === today.getUTCDate() && entry.date.getUTCMonth() === today.getUTCMonth(),
    "This week": (entry: LeaderboardEntry) => {
      
      const firstDayThisWeek = new Date();
      firstDayThisWeek.setDate(today.getDate() - today.getDay());
      firstDayThisWeek.setHours(0);
      firstDayThisWeek.setMinutes(0);
      firstDayThisWeek.setSeconds(0);
      firstDayThisWeek.setMilliseconds(0);

      const firstDayNextWeek = new Date(firstDayThisWeek);
      firstDayNextWeek.setDate(firstDayNextWeek.getDate() + 7);

      return entry.date >= firstDayThisWeek && entry.date < firstDayNextWeek;

    },
    "This month": (entry: LeaderboardEntry) => entry.date.getUTCFullYear() === today.getUTCFullYear() && entry.date.getUTCMonth() === today.getUTCMonth(),
    "This year": (entry: LeaderboardEntry) => entry.date.getUTCFullYear() === today.getUTCFullYear(),
    "All-time": () => true
  }


  const [opened, { open, close }] = useDisclosure(false);
  const [focused, setFocused] = useState(false);
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const floating = name.trim().length !== 0 || focused || undefined;

  const handleSubmit = () => {
    const newEntry: LeaderboardEntry = {
      name,
      score: parseInt(score),
      date: new Date(),
    };
    data.push(newEntry);
    setName('');
    setScore('');
    close();
  };

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        <TextInput
          label="Name"
          placeholder="Austin Vandegriff"
          required
          classNames={classes}
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          mt="md"
          autoComplete="nope"
          data-floating={floating}
          labelProps={{ 'data-floating': floating }}
        />
        <TextInput
          label="Score"
          placeholder="10000000000000"
          required
          classNames={classes}
          value={score}
          onChange={(event) => setScore(event.currentTarget.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          mt="md"
          autoComplete="nope"
          data-floating={floating}
          labelProps={{ 'data-floating': floating }}
        />
        <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={handleSubmit}>
          Submit
        </Button>
      </Modal>
    <div className="leaderboard-container">
      <section>
        {
          Object.keys(filters).map((label) => (
            <button disabled={mode === label} onClick={() => setMode(label as Filter)}>
              {label}
            </button>
          ))
        }
      </section>
      <section>
        <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}  onClick={open} >
          Add New Score
        </Button>
      </section>

      <TableScrollArea entries={data.filter(filters[mode])} />
    </div>
    </div>
  );
};

export default Leaderboard;
