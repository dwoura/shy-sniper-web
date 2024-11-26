import React from 'react';
import { Crown } from 'lucide-react';

interface MembershipBadgeProps {
  level: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum';
}

const LEVEL_COLORS = {
  free: 'bg-gray-100 text-gray-600 border-gray-200',
  bronze: 'bg-amber-100 text-amber-600 border-amber-200',
  silver: 'bg-gray-100 text-gray-600 border-gray-200',
  gold: 'bg-yellow-100 text-yellow-600 border-yellow-200',
  platinum: 'bg-purple-100 text-purple-600 border-purple-200',
};

const LEVEL_NAMES = {
  free: '免费用户',
  bronze: '青铜会员',
  silver: '白银会员',
  gold: '黄金会员',
  platinum: '铂金会员',
};

export default function MembershipBadge({ level }: MembershipBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${LEVEL_COLORS[level]}`}>
      <Crown className="w-3 h-3" />
      {LEVEL_NAMES[level]}
    </div>
  );
}