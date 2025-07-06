import { useState } from 'react';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { BASE_URL } from '@/constants';
import { useFacade } from '@/facades/useFacade';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const { login } = useFacade();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userId) {
            fetch(`${BASE_URL}/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        if (response.status === 404) {
                            throw new Error('User not found');
                        } else {
                            throw new Error(`Server error: ${response.status}`);
                        }
                    }
                    return response.json();
                })
                .then((data) => login(data))
                .catch((err) => setError(err.message));
        }
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your your User ID below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="userId">User ID</Label>
                            <Input
                                id="userId"
                                type="text"
                                placeholder="User ID"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                        {error && <p>{error}</p>}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default Login;
