package com.isolace.common;

/**
 * Utility time methods.
 */
public class Time {
	/**
	 * Utility method to convert milliseconds to a mintues:seconds format.
	 * @param millis Milliseconds value to convert.
	 * @return A string containing minutes:seconds e.g. 155:32 or 56:09.
	 */
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
