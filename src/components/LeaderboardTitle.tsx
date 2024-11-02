import { Title, Text, Button, Container } from "@mantine/core";
import { Dots } from "./Dots";
import classes from "../styles/LeaderboardTitle.module.css";

export function LeaderboardTitle() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Scripted Reality{" "}
          <Text component="span" className={classes.highlight} inherit>
            Leaderboard
          </Text>{" "}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            See the top scores by time or region. Do you have what it takes to
            see yourself on the leaderboard?
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
          >
            Download
          </Button>
          <Button className={classes.control} size="lg">
            Reality +
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default LeaderboardTitle;