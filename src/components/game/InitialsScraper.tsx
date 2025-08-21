"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { OuroborosIcon } from "../icons/OuroborosIcon";
import { getInitialsAction } from "@/lib/actions";

export default function InitialsScraper() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setResult("");
    setError("");

    const formData = new FormData(event.currentTarget);
    const url = formData.get("url") as string;
    
    try {
        const response = await getInitialsAction({ url });
        if (response?.initials) {
            setResult(response.initials);
        } else {
            setError("Failed to extract initials. The arcane energies are weak.");
        }
    } catch (e) {
        setError("An unexpected error occurred during the ritual.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 border-border">
      <CardHeader>
        <CardTitle className="font-headline text-accent">Initials Scraper</CardTitle>
        <CardDescription className="font-body">
          Use this GenAI tool to extract initials from a URL.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="url"
            placeholder="https://example.com"
            type="url"
            required
            className="font-code"
            disabled={loading}
          />
          <Button type="submit" className="w-full font-headline" disabled={loading}>
            {loading ? (
              <>
                <OuroborosIcon className="mr-2 h-4 w-4 animate-spin" />
                Scraping...
              </>
            ) : (
              "Extract Initials"
            )}
          </Button>
        </form>
        {(result || error || loading) && (
            <div className="mt-4 p-4 bg-primary/20 rounded-md border border-primary/50 text-center">
                {loading && <p className="font-roboto-mono text-muted-foreground">Awaiting response from the ether...</p>}
                {error && <p className="font-roboto-mono text-destructive">{error}</p>}
                {result && (
                    <div>
                        <p className="font-roboto-mono text-muted-foreground">Extracted Initials:</p>
                        <p className="font-creepster text-4xl text-accent break-words">{result.substring(0, 50)}</p>
                    </div>
                )}
            </div>
        )}
      </CardContent>
    </Card>
  );
}
