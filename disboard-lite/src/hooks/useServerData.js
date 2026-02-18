import { useState, useEffect, useCallback } from 'react';
import { getMyServers, getMyGuilds } from '../services/api';

export function useServerData() {
    const [myServers, setMyServers] = useState([]);
    const [discordGuilds, setDiscordGuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [serversRes, guildsRes] = await Promise.all([
                getMyServers(),
                getMyGuilds()
            ]);

            setMyServers(serversRes.data || []);

            // Filter guilds where user has Manage Server (0x20) or Admin (0x8) or is Owner
            console.log('Raw Guilds from Discord:', guildsRes.data);
            const adminGuilds = (guildsRes.data || []).filter(g => {
                try {
                    if (g.owner) return true; // Always include validation for owners
                    const perms = BigInt(g.permissions);
                    return (perms & 0x20n) === 0x20n || (perms & 0x8n) === 0x8n;
                } catch (e) {
                    console.warn(`Error parsing permissions for guild ${g.id}`, e);
                    return true; // Fallback if parsing fails
                }
            });
            console.log('Filtered Admin Guilds:', adminGuilds);

            setDiscordGuilds(adminGuilds);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err);
            // Fallback for dev/demo if auth fails - keeping existing behavior
            setMyServers([]);
            setDiscordGuilds([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { myServers, discordGuilds, loading, error, refreshData: fetchData };
}
