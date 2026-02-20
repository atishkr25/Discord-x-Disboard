'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatMemberCount, timeAgo } from '@/lib/utils';
import { Heart } from 'lucide-react';

interface ServerCardProps {
  id: string;
  guildId: string;
  name: string;
  description: string;
  icon?: string;
  memberCount: number;
  tags: string[];
  bumpAt: string;
}

/**
 * Server Card Component
 * Displays a single server in the listing
 */
export default function ServerCard({
  id,
  name,
  description,
  icon,
  memberCount,
  tags,
  bumpAt,
}: ServerCardProps) {
  return (
    <Link href={`/server/${id}`}>
      <div className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg hover:border-primary transition-all cursor-pointer">
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-primary to-secondary relative" />

        {/* Content */}
        <div className="p-4">
          {/* Icon and Title */}
          <div className="flex items-start gap-3 mb-3">
            {icon ? (
              <Image
                src={icon}
                alt={name}
                width={48}
                height={48}
                className="rounded-lg -mt-8 border-2 border-white"
              />
            ) : (
              <div className="w-12 h-12 bg-slate-200 rounded-lg -mt-8 border-2 border-white flex items-center justify-center font-bold">
                {name.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-bold text-lg group-hover:text-primary transition">
                {name}
              </h3>
              <p className="text-xs text-slate-500">
                {formatMemberCount(memberCount)} members
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
            {description}
          </p>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-slate-500">
                +{tags.length - 3} more
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Bumped {timeAgo(bumpAt)}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="p-1 hover:text-red-500 transition"
            >
              <Heart size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
