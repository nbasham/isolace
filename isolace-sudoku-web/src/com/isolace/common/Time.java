package com.isolace.common;

public class Time {
	public static final String millisToSecondsToTimeStr(final long millis) {
		StringBuilder sb = new StringBuilder();
		Double d = new Double(millis / (1000*60));
		int minutes = d.intValue();
		sb.append(minutes);
		sb.append(":");
		long seconds = (millis - (1000*60 * minutes)) / 1000;
		if(seconds < 10)
			sb.append("0");
		sb.append(seconds);

		return sb.toString();
	}
}
