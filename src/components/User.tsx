import { Avatar, Button, XStack } from "tamagui";

export function User() {
    return (
        <XStack>
            <Avatar size="$5" circular>
                <Avatar.Image
                    src = "https://github.com/rodrigorgtic.png"
                />
            </Avatar>

            <Button bg="$blue">Lorem ipsum</Button>
        </XStack>
    );
}